import React, { type PropsWithChildren, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { ApolloProvider, useQuery, gql, } from '@apollo/client';
import {
  Provider,
  ListItem,
} from "@react-native-material/core";
import DisplayLaunchContent from './DisplayLaunches';
import { filterDuplicates } from './utils';
import { client } from './constants';

const LAUNCHES_QUERY = gql`
  {
  launchesUpcoming {
      id
      upcoming
      launch_date_local
      mission_id
      mission_name
      rocket {
        rocket_name
        rocket {
          mass {
            lb
          }
          company
          name
        }
      }
      launch_site {
        site_name
      }
    }
  }
`;


const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>

  );
};

const UpcomingLaunches = () => {
  const { data, loading, error } = useQuery(LAUNCHES_QUERY);
  const [visible, setLaunchContentVisible] = useState(false);
  const [launchDetails, setLaunchDetails] = useState<Launch>();
  const showDialog = (launch: Launch): void => {
    setLaunchDetails(launch);
    setLaunchContentVisible(true);
  }

  if (loading) {
    return <View><Text>Loading...</Text></View>
  }

  if (error) {
    return <View><Text>Error occurred, unable to retrieve launch data.</Text></View>
  }

  const filteredData = filterDuplicates(data?.launchesUpcoming);
  return (
    <View>
      {filteredData.map((launch: Launch) => (
        <ListItem key={launch?.id} title={launch?.mission_name} onPress={() => showDialog(launch)} />
      ))}
      {visible && <DisplayLaunchContent details={launchDetails} isVisible={visible} setVisible={setLaunchContentVisible} />}
    </View>
  )
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ApolloProvider client={client}>
      <Provider>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
              <Section title="Upcoming launches">
                <UpcomingLaunches />
              </Section>
              <Section title="About me">
                <View>
                  <Text style={styles.row}>Name: Philip </Text>
                  <Text style={styles.row}>Email: philsam23@yahoo.com </Text>
                  <Text style={styles.row}>Phone: 925.000.0002 </Text>
                </View>
              </Section>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Provider>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default App;
