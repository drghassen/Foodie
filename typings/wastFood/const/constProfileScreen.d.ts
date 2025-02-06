
declare interface initialUserDataType {
	static name: string;

	static email: string;

	static id: string;

	static location: string;

	static profilePicture: any;

	static completedMeals: number;

	static foodWasteReduced: number;

	static daysActive: number;

	static caloriesBurned: number;

	static stepsTaken: number;

	static achievements: (string | any)[];

	static recentActions: ({	} | any)[];

	static aboutMe: string;

	static socialMedia: {
	static facebook: string;

	static twitter: string;

	static instagram: string;

	static linkedin: string;
	};

	static notifications: ({	} | any)[];

	static friends: ({	} | any)[];

	static preferences: {
	static dietary: string;

	static notifications: boolean;

	static theme: string;
	};
}
