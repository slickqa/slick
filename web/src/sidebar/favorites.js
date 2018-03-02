
import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import FavoriteIcon from 'grommet/components/icons/base/Bookmark';
import BrowserStorage from '../BrowserStorage';
import navigation from '../navigation';

export class FavoriteSideBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: BrowserStorage.User
    };
    this.userUpdatedCallback = this.userUpdatedCallback.bind(this);
  }

  userUpdatedCallback(userinfo) {
    this.setState(() => {
      return {user: userinfo};
    });

  }

  componentDidMount() {
    BrowserStorage.onUpdateUserInfo(this.userUpdatedCallback);
  }

  componentWillUnmount() {
    BrowserStorage.removeOnUpdateUserInfo(this.userUpdatedCallback);
  }

  render() {
    let favoritesList = null;
    if(this.state.user.UserPreferences && this.state.user.UserPreferences.Favorites) {
      favoritesList = this.state.user.UserPreferences.Favorites.map((favorite) => {
        if(favorite.UIViewType === "favorite") {
          return <Anchor key={favorite.Name} path={favorite.Url}>{favorite.Name}</Anchor>;
        }
      });
    }
    return (
      <Box>
        <Heading tag="h3">Favorites</Heading>
        {favoritesList}
      </Box>
    );
  }
}

navigation.registerSidebarMapping("Favorites", 50, FavoriteIcon, FavoriteSideBarComponent);
