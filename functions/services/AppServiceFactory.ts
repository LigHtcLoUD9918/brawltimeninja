import AppService from './AppService';
import BrawlstarsService from './Brawlstars';
import VaingloryService from './Vainglory';
import ApexlegendsService from './Apexlegends';
import WorldOfTanksService from './WorldOfTanks';
import FortniteService from './Fortnite';

export enum Service {
  apexlegends = 'Apex Legends',
  brawlstars = 'Brawlstars',
  fortnite = 'Fortnite',
  vainglory = 'Vainglory',
  // worldoftanks = 'World Of Tanks',
};

const cache = {} as { [service: string]: AppService };

export default function createService(name: keyof typeof Service) {
  if (!(name in cache)) {
    let service: AppService;

    switch (Service[name]) {
      case Service.apexlegends:
        service = new ApexlegendsService();
        break;
      case Service.brawlstars:
        service = new BrawlstarsService(process.env.BRAWLSTARS_TOKEN || '');
        break;
      case Service.fortnite:
        service = new FortniteService();
        break;
      case Service.vainglory:
        service = new VaingloryService(process.env.VAINGLORY_TOKEN || '');
        break;
      /*
      case Service.worldoftanks:
        service = new WorldOfTanksService(process.env.WARGAMING_ID || '');
        break;
      */
      default:
        throw new Error('Missing service factory mapping for ' + name);
    }

    cache[name] = service;
  }

  return cache[name];
}
