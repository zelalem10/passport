import * as types from '../actions/actionTypes';
import React, { Component }  from 'react';

export default function authentication(user = [], action) {

  let token = action.userData;

  switch (action.type) {
    case types.LOGIN_USER_DATA:
    
      localStorage.setItem('userToken', token);
      return [...user, { ...action.userData }];    
    default:
      return user;
  }
}