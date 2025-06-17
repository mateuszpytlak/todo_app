
type TooltipIconProps = {
    className?: string;
}

export const TooltipIcon = ({ className = '' }: TooltipIconProps) => {
    return (
        <div className="relative inline-block group/tooltip">
            <div className={`
        ${className} w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium cursor-help hover:bg-blue-600 transition-colors duration-200
      `}>
                i
            </div>
            <div className="fixed bottom-auto left-auto translate-y-[-100%] mt-[-8px] hidden group-hover/tooltip:block w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-[9999] backdrop-blur-sm bg-opacity-95
      ">
                Click to quickly add sample tasks to your todo list
            </div>
        </div>
    );
};
