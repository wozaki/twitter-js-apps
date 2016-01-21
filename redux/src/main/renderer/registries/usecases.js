import twitterClient from './twitterClient';
import TimelineUsecase from '../../domain/usecases/TimelineUsecase';
import FavoriteUsecase from '../../domain/usecases/FavoriteUsecase';

export const timelineUsecase = new TimelineUsecase(twitterClient);

export const favoriteUsecase = new FavoriteUsecase(twitterClient);
