import twitterClient from './twitterClient';
import TimelineUsecase from '../../domain/usecases/TimelineUsecase';

export const timelineUsecase = new TimelineUsecase(twitterClient);
