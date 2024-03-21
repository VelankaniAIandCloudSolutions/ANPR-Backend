// const { sql, pool } = require("../configs/dbConfig");

// function getOrderItemsWithProduct(orderItem, callback) {
//   const productQuery =
//     "SELECT * FROM mas_product WHERE product_id = @product_id";

//   pool
//     .request()
//     .input("product_id", sql.Int, orderItem.product_id)
//     .query(productQuery, (productError, productResult) => {
//       if (productError) {
//         callback(productError, null);
//       } else {
//         const orderItemWithProduct = {
//           ...orderItem,
//           product: productResult.recordset[0],
//         };
//         callback(null, orderItemWithProduct);
//       }
//     });
// }

// function getOrdersWithItems(ordersArray, callback) {
//   const ordersWithItemsPromises = ordersArray.map((order) => {
//     return new Promise((resolve, reject) => {
//       const orderItemsQuery =
//         "SELECT * FROM order_item WHERE order_id = @input_parameter";
//       pool
//         .request()
//         .input("input_parameter", sql.Int, order.order_id)
//         .query(orderItemsQuery, (itemsError, itemsResults) => {
//           if (itemsError) {
//             reject(itemsError);
//           } else {
//             const orderItems = itemsResults.recordset;
//             const orderItemsWithProductsPromises = orderItems.map(
//               (orderItem) => {
//                 return new Promise((resolveItem, rejectItem) => {
//                   getOrderItemsWithProduct(
//                     orderItem,
//                     (productError, orderItemWithProduct) => {
//                       if (productError) {
//                         rejectItem(productError);
//                       } else {
//                         resolveItem(orderItemWithProduct);
//                       }
//                     }
//                   );
//                 });
//               }
//             );

//             Promise.all(orderItemsWithProductsPromises)
//               .then((itemsWithProducts) => {
//                 resolve({
//                   ...order,
//                   order_items: itemsWithProducts,
//                 });
//               })
//               .catch((itemsError) => {
//                 reject(itemsError);
//               });
//           }
//         });
//     });
//   });

//   Promise.all(ordersWithItemsPromises)
//     .then((results) => callback(null, results))
//     .catch((error) => callback(error));
// }

// exports.getOrders = (req, res) => {
//   const ordersQuery = "SELECT * FROM order_info";
//   pool.request().query(ordersQuery, (error, results) => {
//     if (error) {
//       console.error("Error fetching orders:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//       return;
//     }

//     const allOrders = results.recordset;

//     getOrdersWithItems(allOrders, (error, ordersWithItems) => {
//       if (error) {
//         console.error("Error fetching orders with items:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//         return;
//       }

//       console.log("Orders with Items:", ordersWithItems);

//       res.json({ orders: ordersWithItems });
//     });
//   });
// };

// //   const queryString = "SELECT * FROM order_info";

// //   const request = pool.request();

// //   request
// //     .query(queryString)
// //     .then((result) => {
// //       const ordersData = result.recordset;
// //       const responseData = {
// //         orders: ordersData,
// //       };
// //       res.json(responseData);
// //     })
// //     .catch((error) => {
// //       console.error("Error executing query:", error);
// //       res.status(500).json({ error: "Internal Server Error" });
// //     });
