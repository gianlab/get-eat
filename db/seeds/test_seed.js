/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("lists").del();
  await knex("items_in_list").del();
  await knex("users_in_list").del();

  await knex("users").insert([{
    user_name: "test user",
    user_email: "abc@ccp6team3.com",
    user_password: "0123456789"
  }]);
  await knex("lists").insert([{ list_name: "test list", list_owner: 1 }]);

  await knex("items_in_list").insert([
    { list_id: 1, item_name: "test item 1", quantity: 5, purchased: false },
    { list_id: 1, item_name: "test item 2", quantity: 3, purchased: true },
    { list_id: 1, item_name: "test item 3", quantity: 7, purchased: false },
  ]);
  await knex("users_in_list").insert([
    { list_id: 1, user_id: 1 }
  ]);
};
