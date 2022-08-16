type Rocket = {
    rocket_name: string;
    rocket: {
        company: string;
        mass: {
            lb: number;
        }
    }
}

type Launch = {
    id: string;
    upcoming: boolean;
    launch_date_local: string;
    mission_id: string;
    mission_name: string;
    rocket: Rocket;
    launch_site: {
        site_name: string;
    }
}

interface DisplayProps {
    isVisible: boolean;
    setVisible: Function;
    details: any;
}
