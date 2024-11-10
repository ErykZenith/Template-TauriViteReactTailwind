interface MainProps {
    children: React.ReactNode;
}
const Main: React.FC<MainProps> = (prop) => {
    return (
        <div className="h-full w-full pb-2 flex flex-col items-center overflow-y-auto overflow-x-hidden">
            {prop.children}
        </div>
    );
};
export default Main;
