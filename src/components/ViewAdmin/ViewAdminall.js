import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Row, Col, Button, FormGroup, Label, Input,
  NavLink, Table
} from 'reactstrap';
import Swal from 'sweetalert2';

import confirm from "reactstrap-confirm";

const ViewAdminall = () => {
  const [Admin, setAdmin] = useState([])
  const [filteredData, setFilteredData] = useState(Admin);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = Admin.filter((data) => {
      return data.fname_staff.search(value) != -1;

    });
    setFilteredData(result);
  }

  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/Staff/getAllStaff")
      .then((response) => {
        setAdmin(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.log('Error getting fake data: ' + error);
      })
  }, []);

  const deleteProduct = async (Name, id) => {
    let result = await confirm(
      {
        title: <>คำเตือน!! </>,
        message: 'คุณต้องการลบผู้ดูเเล" ' + Name + ' "ใช่ไหม?',
        confirmText: "ใช่",
        confirmColor: "primary",
        cancelText: "ไม่ใช่",
        cancelColor: "btn btn-danger",

      }); (window.location.assign("/Admin/Adminall"))

    if (result) {
      axios.delete("https://educationservice.herokuapp.com/staff/DeleteStaff/" + id)//คำสั่งลบที่ดึงมาจาก url
        .then((response) => {
          setAdmin(); //อัพเดตหน้าว่าลบไปเเล้ว
        });
    }
  };


  return (
    <div>
      <div className="px-4 flex flex-col max-w-3xl mx-auto mt-32">
        <div className="text-center mx-auto">
          <h3 className="text-center">Admin / Teacher</h3>
          <Col>
            <FormGroup>
              <Label for="year_edu">ค้นหา</Label>
              <Input type="text" className="text-center" name="fname_staff" id="fname_staff" placeholder="กรุณาใส่ชื่อที่จะค้นหา" onChange={(event) => handleSearch(event)} />
            </FormGroup>
          </Col>
        </div>
      </div>
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Row className="pt-5">
          <Col>
            <h3 className="block text-left">รายชื่อผู้ดูเเล</h3>
          </Col>
          <Col>
            <a className="block text-right" href="/Admin/InsertStaff">เพิ่มผู้ดูเเล</a>
          </Col>
        </Row>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="table-striped min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-12 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      รหัสผู้ดูเเล
                    </th>
                    <th
                      scope="col"
                      className="break-all px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      ชื่อ-นามสกุล
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      เบอร์โทรศัพท์
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      ตำเเหน่ง
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((value) => (
                    <tr key={value.id_staff}>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div className="flex items-center">
                          {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                          <div className="ml-4">
                            <div className="text-md font-medium text-gray-900">{value.id_staff}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <div className="text-md text-gray-900">{value.name_title} {value.fname_staff} {value.lname_staff}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md text-gray-900">{value.phone_staff}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md text-gray-900">{value.name_position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium">
                        <a onClick={() => deleteProduct(value.fname_staff, value.id_staff)} className="text-white bg-red-600 hover:bg-red-800 rounded-md px-4 py-2.5 hover:no-underline">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>               <center> {filteredData.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>

        </div>
      </div>
    </div>
  );
}

export default ViewAdminall;