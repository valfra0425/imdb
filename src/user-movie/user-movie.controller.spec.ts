import { Test, TestingModule } from '@nestjs/testing';
import { UserMovieController } from './user-movie.controller';

describe('UserMovieController', () => {
  let controller: UserMovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMovieController],
    }).compile();

    controller = module.get<UserMovieController>(UserMovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
