import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from '../../components/Icon';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import ListItem from '../../components/lists/ListItem';
import {getUser} from '../../storage/UserStorage';
import {logout} from '../../services/auth/LogoutService';

function AccountScreen(props) {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser().then(user => {
      setUser(user);
    });
  }, []);

  const handleLogout = async () => {
    const logoutSuccessFul = await logout();
    if (logoutSuccessFul) {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <ListItem
          title={user.name}
          subtitle={user.email}
          image={require('../../../assets/images/avatar-1.jpg')}
        />
      </View>
      <View style={styles.menu}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            backgroundColor: colors.white,
          }}>
          <Icon
            name={'heart-multiple'}
            size={40}
            backgroundColor={colors.orange}
            iconColor={colors.white}
          />
          <AppText
            style={{fontWeight: 'bold', marginLeft: 10}}
            onPress={() => console.log('My Favorites')}>
            {'My Favorites'}
          </AppText>
        </View>
      </View>
      <View style={styles.logout}>
        <Icon
          name={'logout'}
          size={40}
          backgroundColor={colors.red}
          iconColor={colors.white}
        />
        <AppText
          style={{fontWeight: 'bold', marginLeft: 10}}
          onPress={() => handleLogout()}>
          {'Log Out'}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f4f4',
    width: '100%',
    height: '100%',
  },
  profile: {
    elevation: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  menu: {
    marginTop: 40,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: colors.white,
    padding: 10,
  },
});

export default AccountScreen;
