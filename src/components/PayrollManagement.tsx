import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  role: string;
  salary: number;
  deductions: number;
}

export function PayrollManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const handleAddEmployee = (name: string, role: string, salary: number, deductions: number) => {
    setEmployees([...employees, { id: employees.length + 1, name, role, salary, deductions }]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payroll Management</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add Employee</h2>
        {/* Add form to add employee */}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Employee List</h2>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>{employee.name} - {employee.role}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 