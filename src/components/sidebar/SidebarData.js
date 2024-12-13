import React from 'react';
import * as RiIcons from 'react-icons/ri';
import { BiRocket } from 'react-icons/bi';
import { MdGeneratingTokens } from "react-icons/md";

export const SidebarData = [
	{
		title: 'Projects',
		path: '/dashboard/celebrity-nfts',
		icon: <BiRocket />,
	},
	{
		title: 'private sales',
		path: '/dashboard/projects',
		icon: <MdGeneratingTokens />,
	},
	{
		title: 'Staking',
		path: '/dashboard/staking',
		icon: <RiIcons.RiCoinFill />,
	},
	{
		title: 'Celebrity',
		path: '/dashboard/celebrity',
		icon: <RiIcons.RiCoinFill />,
	},
];
