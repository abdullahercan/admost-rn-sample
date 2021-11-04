/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  Platform,
} from 'react-native';

import Admost, {
  AdmostRewarded,
  AREvents,
  AREventEmitter,
} from 'react-native-admost';

const App = () => {
  const ApplicationId =
    Platform.OS == 'ios'
      ? '15066ddc-9c18-492c-8185-bea7e4c7f88c'
      : '6cc8e89a-b52a-4e9a-bb8c-579f7ec538fe';

  const RewardedVideoZoneId =
    Platform.OS == 'ios'
      ? '2bdefd44-5269-4cbc-b93a-373b74a2f067'
      : '88cfcfd0-2f8c-4aba-9f36-cc0ac99ab140';

  Admost.setAppID(ApplicationId);
  Admost.setUserConsents(true);
  Admost.setSubjectToGDPR(false);
  Admost.setUserChild(false);
  Admost.start();

  useEffect(() => {
    async function Ar() {
      await AdmostRewarded.initWithZoneID(RewardedVideoZoneId);
      await AdmostRewarded.loadAd();

      console.log({
        OS: Platform.OS,
        ApplicationId,
        RewardedVideoZoneId,
      });
    }

    Ar();

    AREventEmitter.addListener(AREvents.DID_FAIL_TO_RECEIVE, async () => {
      console.log('ad did fail to receive');
    });
    AREventEmitter.addListener(AREvents.DID_RECEIVE, async () => {
      console.log('ad did receive');
      await AdmostRewarded.showAd();
    });
    AREventEmitter.addListener(AREvents.DID_SHOW, async () => {
      console.log('ad did show');
    });
    AREventEmitter.addListener(AREvents.DID_COMPLETE, async () => {
      console.log('ad did complete');
    });

    return () => {
      AREventEmitter.removeEventListener(AREvents.DID_FAIL_TO_RECEIVE);
      AREventEmitter.removeEventListener(AREvents.DID_RECEIVE);
      AREventEmitter.removeEventListener(AREvents.DID_SHOW);
      AREventEmitter.removeEventListener(AREvents.DID_COMPLETE);
    };
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <Text>Selam</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
