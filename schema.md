# Schema Design

`pk` = Primary Key
`ref: >` = Many to one
`ref: <` = One to many
`ref: -` = One to one

## Lists Table

```
Table lists {
  id serial [pk]
  list_name varchar(64)
  list_owner int [ref: > users.id, not null]
}
```

## Items in List Table

```
Table items_in_list {
  list_id int [ref: > lists.id, not null]
  item_name varchar(32) [not null]
  quantity int [not null]
  purchased boolean [not null]
}
```

## Users Table

```
  id serial [pk]
  user_name varchar(32)
  user_email varchar(32)
  user_pro_pic bytea
  user_password vachar(64)
```

## Users in List Table

```
users_in_list {
  list_id int [ref: > lists.id, not null]
  user_id int [ref: > users.id, not null]
}
```
