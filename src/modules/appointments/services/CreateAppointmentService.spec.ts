import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () =>{
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '111',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('111');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointmentDate = new Date(2021, 2, 1, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '111',
    });

    expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '111',
    })).rejects.toBeInstanceOf(AppError);
  });
});