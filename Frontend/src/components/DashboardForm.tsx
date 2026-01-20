import { useEffect, useState } from "react";

const Categories = [
    { id: "surplus", label: "Surplus"},
    { id: "keyboards", label: "Keyboards"},
    { id: "gym", label: "Gym"},
];

type Expense = {
  id: number;
  hobby: string;
  description: string | null;
  location: string | null;
  amount: number;
  expense_date: string;
  created_at: string;
};

export default function DashboardForm(){
    const [category, setCategory] =useState("");
    const [amount, setAmount] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [expenses, setExpenses] = useState<Expense[]>([]);

    async function submitExpense() {
        if (!category || !amount || !date) return;

        await fetch("http://localhost:3001/expenses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                hobby: category,
                description,
                location,
                amount,
                expense_date: date,
            }),
    });

    fetchExpenses();

    setCategory("");
    setAmount("");
    setDate("");
    setDescription("");
  }

  async function fetchExpenses() {
    const res = await fetch("http://localhost:3001/expenses");
    const data = await res.json();
    setExpenses(data);
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

    return(
    <div>

        <div>
            <label>Category</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                <option value="">Select</option>
                {Categories.map((cat) =>(
                    <option key={cat.id} value={cat.id}>
                    {cat.label}
                    </option>
                ))}  
            </select>
         </div> 

        <div>
            <label>$ Spent</label>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
        </div>

        <div>
            <label>Location</label>
            <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
        </div>

        <div>
            <label>Date</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
        </div>

    <div>
        <label>Description</label>
        <textarea
         value={description}
         onChange={(e) => setDescription(e.target.value)}
        rows={6}
        cols={30}
        />
    </div>

    <button onClick={submitExpense}>Add Expense</button>

    <hr/>

    <div>
        {expenses.map((e) => (
          <div key={e.id}>
            <strong>{e.hobby}</strong> — ${e.amount}  
            <div>{e.description}</div>
            <small>{e.expense_date}</small>
          </div>
        ))}
    </div>            
    </div>
    )
}