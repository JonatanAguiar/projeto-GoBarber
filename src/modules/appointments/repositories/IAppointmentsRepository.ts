import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import IFindAllInDayFromProviderDTO from "../dtos/IFindAllInDayFromProviderDTO";
import IFindAllInMonthFromProviderDTO from "../dtos/IFindAllInMonthFromProviderDTO";
import Appointment from "../infra/typeorm/entities/Appointment";

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>;
  findAllInDayProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>;
}
