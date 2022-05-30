import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faPlusSquare, faAddressBook, faAtom, faTachometerAlt, faGlobe, faHome, faChalkboard, faAd, faChartBar, faCheckSquare, faRecycle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Sidebar = ({ activemenu, submenu }) => {
  return (
    <ProSidebar breakPoint={'md'} >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 15,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          VESLOO HOLDINGS
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="round">
          <MenuItem
            active={activemenu === 'DASHBOARD'}
            icon={<FontAwesomeIcon icon={faHome} />}>
            Home<Link to="/" />
          </MenuItem>
          <SubMenu title="Employee" defaultOpen={activemenu === 'EMPLOYEE'} icon={<FontAwesomeIcon icon={faAddressBook} />}>
          <MenuItem active={submenu === 'EMPLOYEE_LIST'}>Manage Employees <Link to="/Employee/list" /></MenuItem>
            <MenuItem active={submenu === 'ADD_EMPLOYEE'}>Add Employee<Link to="/Employee/add" /></MenuItem>
            <MenuItem active={submenu === 'UPDATE_EMPLOYEE'}>Edit Employee<Link to="/Employee/update/:id" /></MenuItem>
            <MenuItem active={submenu === 'DELETE_EMPLOYEE'}>Delete Employee<Link to="/Employee/delete/:id" /></MenuItem>
            <MenuItem active={submenu === 'Basic_LIST'}>Employee Basic Information<Link to="/Employee/blist" /></MenuItem>
            <MenuItem active={submenu === 'Attendance_EMPLOYEE'}>Employee Salary And Attendance Calculation<Link to="/Employee/att/:id"/></MenuItem>
            <MenuItem active={submenu === 'SALARY_LIST'}>Employee Salary Report <Link to="/Employee/salaryReport" /></MenuItem>
            <MenuItem active={submenu === 'ATTENDANCE_LIST'}>Employee Attendace Details <Link to="/Employee/attD" /></MenuItem>

          </SubMenu>
          <SubMenu title="Machine" defaultOpen={activemenu === 'Machine'} icon={<FontAwesomeIcon icon={faChartBar} />}>
            <MenuItem active={submenu === 'MACHINE_LIST'}>Manage Machine <Link to="/Machine/list" /></MenuItem>
            <MenuItem active={submenu === 'ADD_MACHINE'}>Add Machine<Link to="/Machine/add" /></MenuItem>
            <MenuItem active={submenu === 'EXPENSE_LIST'}>Manage Expense <Link to="/Expense/list" /></MenuItem>
            <MenuItem active={submenu === 'ADD_EXPENSE'}>Add Expense<Link to="/Expense/add" /></MenuItem>
            <MenuItem active={submenu === 'EXPENSE_REOPRT'}>Expense Report<Link to="/Expense/selectDate" /></MenuItem>
          </SubMenu>
          <SubMenu title="Stock" defaultOpen={activemenu === 'Stock'} icon={<FontAwesomeIcon icon={faChalkboard} />}>
            <MenuItem active={submenu === 'STOCK_LIST'}>Manage Stock <Link to="/Stock/list" /></MenuItem>
            <MenuItem active={submenu === 'ADD_STOCK'}>Add Stock<Link to="/Stock/add" /></MenuItem>
            <MenuItem active={submenu === 'ADD_DSTOCK'}>Add Damaged Stock<Link to="/DStock/add" /></MenuItem>
            <MenuItem active={submenu === 'STOCKEXPENSE'}>Expense<Link to="/DStock/StockExpense" /></MenuItem>
            
          </SubMenu>
          <SubMenu title="Supplier" defaultOpen={activemenu === 'SUPPLIER'} icon={<FontAwesomeIcon icon={faCheckSquare} />}>
            <MenuItem active={submenu === 'SUPPLIER_LIST'}>Manage Supplier <Link to="/Supplier/list" /></MenuItem>
            <MenuItem active={submenu === 'ADD_SUPPLIER'}>Add Supplier<Link to="/Supplier/add" /></MenuItem>
            <MenuItem active={submenu === 'ADD_PAYMENT'}>Add Payment<Link to="/Payment/add" /></MenuItem>
            <MenuItem active={submenu === 'PAYMENT_LIST'}>Payment<Link to="/Payment" /></MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
    
    </ProSidebar>
  );
}

export default Sidebar;