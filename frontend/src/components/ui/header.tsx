import { ModeToggle } from '@/components/ui/mode-toggle'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

export function Header() {
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);

    return (
        <div className="flex items-center justify-between px-4 h-[60px] mb-6">
            <h1 className="font-black text-2xl cursor-pointer" onClick={() => navigate("/")}>Job Board</h1>
            <div className="flex gap-3 items-center justify-center">
                <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
                {user.role === "employer" && (
                    <Button variant="ghost" onClick={() => navigate("/job/new")}>New Job</Button>
                )}
            </div>
            <div className="flex items-center justify-end gap-2">
                {user.username ? (
                    <div className="flex gap-3 items-center justify-center">
                        <p>
                            {user.username}
                        </p>
                        <Button variant="destructive" onClick={() => logout()}>Log Out</Button>
                    </div>
                ) : (
                    <>
                        <Button onClick={() => navigate("/signup")}>Sign Up</Button>
                        <Button variant="outline" onClick={() => navigate("/login")}>Log In</Button>
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    )
}