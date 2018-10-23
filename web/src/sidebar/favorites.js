
import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import FavoriteIcon from 'grommet/components/icons/base/Bookmark';
import navigation from '../navigation';
import {inject, observer} from 'mobx-react';


@inject('UserState') @observer
export class FavoriteSideBarComponent extends Component {

  render() {
    let favoritesList = null;
    const {UserState} = this.props;
    if(UserState.User.UserPreferences && UserState.User.UserPreferences.Favorites) {
      favoritesList = UserState.User.UserPreferences.Favorites.map((favorite) => {
        if(favorite.Type === "favorite") {
          return <Anchor key={favorite.Id.Name} path={favorite.Url}>{favorite.Id.Name}</Anchor>;
        }
      });
    }
    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Favorites</Heading>
        </Box>
        {favoritesList}
      </Box>
    );
  }
}

navigation.registerSidebarMapping("Favorites", 50, FavoriteIcon, FavoriteSideBarComponent);
