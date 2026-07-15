import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function InputManual() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtasksCount, setSubtasksCount] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [estimateValue, setEstimateValue] = useState('');
  const [estimateUnit, setEstimateUnit] = useState('Min');
  const [showEstimateDropdown, setShowEstimateDropdown] = useState(false);
  const [priority, setPriority] = useState('Optional');

  return (
    <div className="h-full flex flex-col bg-[#f5f5f8] text-[#1c1c1e] font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 pt-8 bg-[#f5f5f8] sticky top-0 z-20">
        <button 
          onClick={() => navigate(-1)}
          className="text-blue-accent text-[17px] font-normal"
        >
          Cancel
        </button>
        <h1 className="text-[17px] font-semibold tracking-tight">New Task</h1>
        <button 
          onClick={() => navigate(-1)}
          className="text-blue-accent text-[17px] font-semibold"
        >
          Done
        </button>
      </div>

      <div className={`flex-1 px-5 overflow-y-auto scrollbar-hide pt-2 ${showCalendar || showEstimateDropdown ? 'pb-[320px]' : 'pb-10'}`}>
        
        {/* Title */}
        <div className="mb-5">
          <label className="block text-[15px] font-medium text-[#1c1c1e] mb-2 ml-1">Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Task Title"
            className="w-full bg-white rounded-[16px] py-4 px-4 text-[15px] text-[#1c1c1e] placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-primary-accent/50 transition-all shadow-sm"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-[15px] font-medium text-[#1c1c1e] mb-2 ml-1">Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Task Description"
            className="w-full bg-white rounded-[16px] py-4 px-4 text-[15px] text-[#1c1c1e] placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-primary-accent/50 transition-all shadow-sm resize-none h-[120px]"
          />
        </div>

        {/* Subtasks */}
        <div className="mb-5">
          <label className="block text-[15px] font-medium text-[#1c1c1e] mb-2 ml-1">Subtasks</label>
          <div className="bg-white rounded-[16px] p-4 flex items-center justify-between shadow-sm">
            <span className="text-[15px] text-[#1c1c1e]">How many subtasks?</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSubtasksCount(Math.max(0, subtasksCount - 1))}
                className="w-8 h-8 flex items-center justify-center text-[#1c1c1e] hover:bg-gray-100 rounded-full transition-colors"
              >
                <Minus size={20} strokeWidth={2.5} />
              </button>
              <span className="text-[16px] font-semibold w-4 text-center">{subtasksCount}</span>
              <button 
                onClick={() => setSubtasksCount(subtasksCount + 1)}
                className="w-8 h-8 flex items-center justify-center text-[#1c1c1e] hover:bg-gray-100 rounded-full transition-colors"
              >
                <Plus size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {subtasksCount > 0 && (
          <div className="space-y-3 mb-5">
            {Array.from({ length: subtasksCount }).map((_, i) => (
              <div key={i} className="relative flex items-center">
                <div className="absolute left-4 w-4 h-4 rounded-full border-2 border-[#aeaeb2] transition-colors"></div>
                <input 
                  type="text"
                  placeholder={`Step ${i + 1}...`}
                  className="w-full bg-white rounded-[16px] py-3.5 pl-11 pr-4 text-[14px] text-[#1c1c1e] placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-primary-accent/50 transition-all shadow-sm"
                />
              </div>
            ))}
          </div>
        )}

        {/* Due Date & Estimate Time */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div>
            <label className="block text-[15px] font-medium text-[#1c1c1e] mb-2 ml-1">Due Date</label>
            <div className="relative">
              <button 
                onClick={() => setShowCalendar(!showCalendar)}
                className={`w-full bg-white rounded-[16px] py-4 pl-4 pr-4 text-[15px] flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-accent/50 transition-all shadow-sm ${dueDate ? 'text-[#1c1c1e]' : 'text-[#aeaeb2]'}`}
              >
                <span>{dueDate || 'Select Date'}</span>
                <Calendar size={20} strokeWidth={2} className="text-[#1c1c1e]" />
              </button>
              
              {showCalendar && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowCalendar(false)}></div>
                  <div className="absolute top-[110%] left-0 w-[260px] bg-white rounded-[20px] shadow-xl border border-gray-100 p-4 z-50">
                     <div className="flex justify-between items-center mb-4">
                       <button 
                         onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                         className="p-1 hover:bg-gray-100 rounded-full"
                       >
                         <ChevronLeft size={18} />
                       </button>
                       <span className="font-semibold text-[14px]">
                         {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][currentMonth.getMonth()]} {currentMonth.getFullYear()}
                       </span>
                       <button 
                         onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                         className="p-1 hover:bg-gray-100 rounded-full"
                       >
                         <ChevronRight size={18} />
                       </button>
                     </div>
                     <div className="grid grid-cols-7 gap-1 text-center text-[12px] font-medium text-[#aeaeb2] mb-2">
                       <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                     </div>
                     <div className="grid grid-cols-7 gap-1 text-center">
                        {Array.from({length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()}).map((_, i) => (
                          <div key={`empty-${i}`}></div>
                        ))}
                        {Array.from({length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()}).map((_, i) => {
                          const day = i + 1;
                          const monthStr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][currentMonth.getMonth()];
                          const dateStr = `${day} ${monthStr}`;
                          const isSelected = dueDate === dateStr;
                          return (
                            <button 
                              key={day}
                              onClick={() => {
                                setDueDate(dateStr);
                                setShowCalendar(false);
                              }}
                              className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-[13px] font-medium hover:bg-gray-100 ${isSelected ? 'bg-[#c3f53c] text-black' : 'text-[#1c1c1e]'}`}
                            >
                              {day}
                            </button>
                          );
                        })}
                     </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-[15px] font-medium text-[#1c1c1e] mb-2 ml-1">Estimate Time</label>
            <div className="relative flex items-center bg-white rounded-[16px] shadow-sm border border-transparent focus-within:border-primary-accent focus-within:ring-2 focus-within:ring-primary-accent/50 transition-all h-[54px]">
              <input 
                type="number" 
                value={estimateValue}
                onChange={(e) => setEstimateValue(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent py-4 pl-4 pr-1 text-[15px] text-[#1c1c1e] placeholder:text-[#aeaeb2] focus:outline-none"
              />
              <div className="relative flex items-center border-l border-gray-100 pl-2 pr-3 h-[30px]">
                <button 
                  onClick={() => setShowEstimateDropdown(!showEstimateDropdown)}
                  className="bg-transparent text-[14px] font-medium text-[#1c1c1e] focus:outline-none flex items-center gap-1.5"
                >
                  {estimateUnit}
                  <Clock size={15} strokeWidth={2.5} className="text-[#aeaeb2] pointer-events-none" />
                </button>
                {showEstimateDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowEstimateDropdown(false)}></div>
                    <div className="absolute top-[120%] right-0 w-[120px] bg-white rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-2 z-50">
                      {['Min', 'Hour', 'Day'].map(unit => (
                        <button
                          key={unit}
                          onClick={() => {
                            setEstimateUnit(unit);
                            setShowEstimateDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-[14px] hover:bg-gray-50 transition-colors ${estimateUnit === unit ? 'font-bold text-black bg-[#f5f5f8]' : 'font-medium text-[#1c1c1e]'}`}
                        >
                          {unit}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Priority */}
        <div className="mb-6">
          <label className="block text-[15px] font-medium text-[#1c1c1e] mb-2 ml-1">Priority</label>
          <div className="bg-white rounded-[16px] p-1.5 flex shadow-sm">
            {['Optional', 'Routine', 'High'].map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`flex-1 py-3 text-[14px] font-medium rounded-[12px] transition-all ${
                  priority === p 
                    ? 'bg-[#c3f53c] text-black shadow-sm' 
                    : 'text-[#aeaeb2] hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
