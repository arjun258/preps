import React from "react";
import Post from "./post";

const Homepage = (props) => {
  let sorted_list = [];
  let post_data = [];

  console.log(props.datamd, "upar wali lines");
  console.log(props.vendor_data, "huluhuluhul");

  props.vendor_data.forEach((k) => {
    console.log(props.pincode,"pincode")
    if (props.pincode == k.pincode) {
      sorted_list.push(k);
    } else {
      console.log("hehe");
    }
  });

  sorted_list.forEach((m) => {
    props.datamd.forEach((post) => {
      if (m.id === post.id) {
        post_data.push({
          post_data: post,
          bus_name: m.business_name,
          number: m.phone,
          id : m.id,
          category : m.category
        });
      } else {
        console.log("okay");
      }
    });
  });

  console.log(sorted_list, "sorted_list");
  console.log(post_data, "huhuhuhuhhuh");

  return (

    
    <div className="bg-dark cards-container  flex-wrap gap-5 justify-content-around">
      {post_data.length > 0 ? (
        post_data.map((elem, index) => (
          <Post 
            key={index}
            data={elem.post_data}
            bus_name={elem.bus_name}
            number={elem.number}
            navigate = {props.navigate}
          />
          
        ))
      ) : (
        <p className="text-light">No posts found for this pincode.</p>
      )}
    </div>
  );
  
};

export default Homepage;
