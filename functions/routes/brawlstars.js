const cors = require('cors');
const express = require('express');
const BrawlStars = require('brawlstars');

const token = process.env.BRAWLSTARS_TOKEN;
if (token == undefined) throw new Error('Please set $BRAWLSTARS_TOKEN!');

const client = new BrawlStars.Client({ token });
const router = express.Router();

router.options('*', cors());

router.get('/featured-players', cors(), async (req, res) => {
  res.json([{
    name: 'xXcuzMePlisThXx',
    tag: 'V8LLPPC'
  }, {
    name: 'Keith',
    tag: '2Y02L28'
  }, {
    name: 'Landi',
    tag: 'V9QGJY9'
  }]);
});

router.get('/player/:tag', cors(), async (req, res) => {
  try {
    const player = await client.getPlayer(req.params.tag);
    const heroes = {};
    player.brawlers.forEach((brawler) => {
      const brawlerId = brawler.name.toLowerCase().replace(' ', '_');
      heroes[brawlerId] = {
        label: brawler.name,
        icon: `/images/brawlstars/heroes/icon/${brawlerId}.png`,
        stats: {
          trophies: {
            label: 'Current',
            value: brawler.trophies,
            icon: '/images/brawlstars/icon/trophy.png'
          },
          maxTrophies: {
            label: 'Max',
            value: brawler.highestTrophies,
            icon: '/images/brawlstars/icon/trophy.png'
          },
          level: {
            label: 'Power',
            value: brawler.level,
            icon: '/images/brawlstars/icon/powerpoint.png'
          }
        }
      }
    });

    res.json({
      tag: player.tag,
      name: player.name,
      heroes,
      modes: {
        '3v3': {
          label: '3v3',
          icon: '/images/brawlstars/mode/icon/gemgrab.png',
          background: '/images/brawlstars/mode/background/gemgrab.png',
          stats: {
            victories: {
              label: 'Victories',
              value: player.victories,
            }
          }
        },
        'soloShowdown': {
          label: 'Solo Showdown',
          icon: '/images/brawlstars/mode/icon/showdown.png',
          background: '/images/brawlstars/mode/background/showdown.png',
          stats: {
            victories: {
              label: 'Victories',
              value: player.soloShowdownVictories,
            }
          }
        },
        'duoShowdown': {
          label: 'Duo Showdown',
          icon: '/images/brawlstars/mode/icon/duoshowdown.png',
          background: '/images/brawlstars/mode/background/showdown.png',
          stats: {
            victories: {
              label: 'Victories',
              value: player.duoShowdownVictories,
            }
          }
        },
      },
    });
  } catch (error) {
    if (error.response != undefined) {
      console.error(error.response.text);
      res.status(error.response.status);
      res.json({ error: error.response.statusText });
    } else {
      console.error(error);
      res.status(400);
      res.json({ error: '' });
    }
  }
});

module.exports = router;
