const knex = require("../../db/knex");

//handlers for the routes

module.exports = {
  //get all list in DB
  getAllLists() {
    return knex
      .select({
        id: "id",
        listName: "list_name",
        owner: "list_owner",
      })
      .from("lists");
  },

  //get all items from a list 
  getAllItemsFromList(listId) {
    return knex
      .select({
        itemName: "item_name",
        quantity: "quantity",
        purchased: "purchased"
      })
      .from("items_in_list")
      .join("items", { "items.id": "items_in_list.item_id" })
      .where("items_in_list.list_id", "=", listId);
  },

  //get user data 
  getUserData(userId) {
    return knex.select({
      userId: "user_id",
      userName: "user_name",
      userEmail: "user_email",
      userProPic: "user_pro_pic",
      userPassword: "user_password"
    })
      .from("users")
      .where("id", "=", userId);
  },

  //get all lists that user join
  getAllListsOnUser(userId) {
    return knex.select({
      listId: "list_id",
      listName: "list_name",
    })
      .from("lists")
      .where('lists.list_owner', '=', userId)
  },

  //get all users that list have
  getAllUsersInList(listId) {
    return knex.select({
      userId: "user_id",
      userName: "user_name",
      userEmail: "user_email",
      userProPic: "user_pro_pic"
    })
      .from("users_in_list")
      .join("users", { "users.id": "users_in_list.user_id" })
      .where('users_in_list.user_id', '=', listId)
  },

  // getCode() {
  //   return knex.select({
  //     code: "code"
  //   })
  //     .from('codes')
  // }
};
