import twitterClient from './twitterClient';
import TimelineUsecase from '../../domain/usecases/TimelineUsecase';
import FavoriteUsecase from '../../domain/usecases/FavoriteUsecase';
import FollowingUsecase from '../../domain/usecases/FollowingUsecase';

export const timelineUsecase = new TimelineUsecase(twitterClient);

export const favoriteUsecase = new FavoriteUsecase(twitterClient);

export const followingUsecase = new FollowingUsecase(twitterClient);
