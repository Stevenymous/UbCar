/**
* Commentaire.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'commentaire',
  connection: 'blablabla',
  tableName: 'commentaire',
  attributes: {
  	id: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      columnName: 'id'
    },
    message: {
      type: 'string',
      size: 250,
      columnName: 'message'
    },
    dateCommentaire: {
      type: 'datetime',
      columnName: 'dateDepart',
      defaultsTo: function (){ return new Date(); }
    }
    // reference a trajet
    owner: {
      model: 'trajet'
    }
  }
};

