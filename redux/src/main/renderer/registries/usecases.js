import twitterClient from './twitterClient';
import TimelineUsecase from '../../domain/usecases/TimelineUsecase';
import FavoriteUsecase from '../../domain/usecases/FavoriteUsecase';
import FollowUsecase from '../../domain/usecases/FollowUsecase';

export const timelineUsecase = new TimelineUsecase(twitterClient);

export const favoriteUsecase = new FavoriteUsecase(twitterClient);

export const followUsecase = new FollowUsecase(twitterClient);
