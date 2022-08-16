
import React from 'react';
import {
    Text,
} from 'react-native';

import {
    Button,
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
} from "@react-native-material/core";
import moment from 'moment-timezone';


const DisplayLaunchContent = (props: DisplayProps) => {
    const { details, isVisible, setVisible } = props;
    const timezone = moment.tz.guess();
    const userTimezone = moment.tz(details?.launch_date_local, timezone).format('LLLL');
    return (
        <Dialog visible={isVisible} onDismiss={() => setVisible(false)}>
            <DialogHeader title={`${details?.mission_name} details`} />
            <DialogContent>
                <Text>Mission ID: {details?.mission_id}</Text>
                <Text>Mission Name: {details?.mission_name}</Text>
                <Text>Rocket Name: {details?.rocket?.rocket_name}</Text>
                <Text>Rocket Mass: {details?.rocket?.rocket?.mass?.lb} lb</Text>
                <Text>Rocket Company: {details?.rocket?.rocket?.company}</Text>
                <Text>Launch Site Name: {details?.launch_site?.site_name}</Text>
                <Text>Launch Date: {userTimezone}</Text>
            </DialogContent>
            <DialogActions>
                <Button
                    title="Ok"
                    compact
                    variant="text"
                    onPress={() => setVisible(false)}
                />
            </DialogActions>
        </Dialog>
    )
}

export default DisplayLaunchContent;