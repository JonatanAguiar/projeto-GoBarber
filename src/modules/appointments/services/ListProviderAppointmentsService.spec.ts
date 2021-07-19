import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () =>{
  beforeEach(()=>{
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(fakeAppointmentsRepository);
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 6, 20, 14, 0, 0) 
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 6, 20, 15, 0, 0) //o mes começa em 0, por isso 6 é julho
    });
    
    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2021,
      month: 7,
      day: 20,
    });

    expect(appointments).toEqual([
        appointment1,
        appointment2
    ]);
  });
});
