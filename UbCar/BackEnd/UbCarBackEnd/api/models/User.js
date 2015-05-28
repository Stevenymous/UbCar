/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'user',
  connection: 'blablabla',
  tableName: 'user',
  attributes: {
  	//autoPK: true ?
  	id: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      columnName: 'id'
    },
    nom: {
      type: 'string',
      required: true,
      size: 25,
      columnName: 'nom'
    },
    prenom: {
      type: 'string',
      required: true,
      size: 25,
      columnName: 'prenom'
    },
    ville: {
      type: 'string',
      required: true,
      size: 50,
      columnName: 'ville'
    },
    place: {
      type: 'integer',
      required: true,
      columnName: 'place'
    },
    mdp: {
      type: 'string',
      required: true,
      columnName: 'mdp'
    },
    email: {
      type: 'email',
      required: true,
      unique: true,
      columnName: 'email'
    }
    // reference to trajet
    trajets: {
      collection: 'trajet',
      via: 'owners',
      dominant: true
    }
  }
};