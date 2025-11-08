import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ImpactReportModal = ({ userData, onClose }) => {
  const monthlyData = [
    { month: 'Jul', saved: 25, donated: 3 },
    { month: 'Aug', saved: 30, donated: 4 },
    { month: 'Sep', saved: 28, donated: 4 },
    { month: 'Oct', saved: 35, donated: 5 },
  ];

  const categoryData = [
    { category: 'Dining', saved: 12 },
    { category: 'Travel', saved: 8 },
    { category: 'Groceries', saved: 10 },
    { category: 'Sports', saved: 5 },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">Impact Report</h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-accent-apply/10 to-secondary/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Total Saved</h3>
              <p className="text-3xl font-bold text-accent-apply">${userData.saved}</p>
              <p className="text-sm text-text-secondary mt-2">This month</p>
            </div>
            <div className="bg-gradient-to-br from-accent-donate/10 to-secondary/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Total Donated</h3>
              <p className="text-3xl font-bold text-accent-donate">${userData.donated}</p>
              <p className="text-sm text-text-secondary mt-2">This month</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Monthly Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="saved" stroke="#1FAD66" strokeWidth={2} name="Saved ($)" />
                <Line type="monotone" dataKey="donated" stroke="#2D6CDF" strokeWidth={2} name="Donated ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Savings by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="saved" fill="#1FAD66" name="Saved ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactReportModal;

