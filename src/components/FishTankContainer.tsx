import React from 'react';
import { fishAttributes } from '../constants/fish_constants';
import { FishTank } from './FishTank';

export const FishTankContainer = (): React.ReactElement => (
	<div className="flex-1 relative overflow-hidden">
		<FishTank fishes={fishAttributes} />
		<div className="w-full h-full absolute inset-0 select-none z-10" />
	</div>
);
