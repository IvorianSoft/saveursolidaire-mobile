import React, {useState} from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {search} from '../services/SearchService';
import Card from '../components/Card';
import LoaderComponent from '../components/Loader';

console.disableYellowBox = true;

const SearchScreen = () => {
  const [stores, setStores] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onSubmit = async location => {
    setLoading(true);
    const stores = await search(location);
    setStores(stores);
    setLoading(false);
  };

  const onChangeHandler = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const [scrollYValue] = useState(new Animated.Value(0));

  return (
    <View style={{flex: 1}}>
      <SearchBar
        placeholder="Search"
        lightTheme={true}
        placeholderTextColor={'#888888'}
        onChangeText={onChangeHandler}
        onSubmitEditing={() => onSubmit(searchQuery)}
        value={searchQuery}
      />
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingTop: 10,
          }}
          contentInsetAdjustmentBehavior="automatic">
          {stores &&
            stores.map((store, index) => <Card key={index} store={store} />)}

          <LoaderComponent loading={loading} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SearchScreen;
