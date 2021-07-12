import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () =>{
  beforeEach(()=>{
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 5, 20, 8, 0, 0) //o mes começa em 0, por isso 6 é julho
    });
    await fakeAppointmentsRepository.create({
       provider_id: 'user',
       date: new Date(2021, 6, 20, 8, 0, 0) //o mes começa em 0, por isso 6 é julho
    });
    await fakeAppointmentsRepository.create({
       provider_id: 'user',
       date: new Date(2021, 6, 20, 10, 0, 0) 
    });
    await fakeAppointmentsRepository.create({
       provider_id: 'user',
       date: new Date(2021, 6, 21, 8, 0, 0) 
    });

    const availability = await listProviderMonthAvailability.execute({
        provider_id: 'user',
        year: 2021,
        month: 7
    });

    expect(availability).toEqual(
        expect.arrayContaining([
            { day: 19, availability: true },
            { day: 20, availability: false },
            { day: 21, availability: false },
            { day: 22, availability: true },
        ]),
    );
  });
});
