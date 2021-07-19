import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

//import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
      @inject('AppointmentsRepository')
      private appointmentsRepository: IAppointmentsRepository
  ){}
  public async execute({ provider_id, month, year, day }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({ 
        provider_id, 
        month, 
        year, 
        day 
    });

    return appointments;
  }
}

export default ListProviderAppointmentsService;
