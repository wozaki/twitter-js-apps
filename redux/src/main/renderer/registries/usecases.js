import TimelineUsecase from '../../domain/usecases/TimelineUsecase';
import FavoriteUsecase from '../../domain/usecases/FavoriteUsecase';
import FollowUsecase from '../../domain/usecases/FollowUsecase';

//TODO: remove usecase from registries

export const timelineUsecase = (tw) => new TimelineUsecase(tw);

export const favoriteUsecase = (tw) => new FavoriteUsecase(tw);

export const followUsecase = (tw) => new FollowUsecase(tw);
