import { Test, TestingModule } from '@nestjs/testing';
import { WelcomeController } from './welcome.controller';

describe('WelcomeController', () => {
  let controller: WelcomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WelcomeController],
    }).compile();

    controller = module.get<WelcomeController>(WelcomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
