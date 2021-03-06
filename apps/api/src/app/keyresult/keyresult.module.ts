import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyResult } from './keyresult.entity';
import { KeyResultService } from './keyresult.service';
import { KeyResultController } from './keyresult.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TenantModule } from '../tenant/tenant.module';

@Module({
	imports: [TypeOrmModule.forFeature([KeyResult]), CqrsModule, TenantModule],
	controllers: [KeyResultController],
	providers: [KeyResultService],
	exports: [KeyResultService]
})
export class KeyResultModule {}
