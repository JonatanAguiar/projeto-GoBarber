import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppontmentInSameDate = appointments.find((appointment) =>
    isEqual(parsedDate, appointment.date));

  if (findAppontmentInSameDate) {
    return response.status(400).json({ message: 'This appointment is already booked' });
  }

  const appointment = new Appointment(provider, date);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
