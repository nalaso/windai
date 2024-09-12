import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBugReportModal } from "@/hooks/useBugReportModal";
import { Badge, RadioGroup, RadioGroupItem } from './ui';
import { submitBugReport } from "@/actions/ui/submit-bug-report";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSession } from 'next-auth/react';
import { useAuthModal } from '@/hooks/useAuthModal';
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { GitFork } from 'lucide-react';

export const BugReportModal = () => {
    const bugReportModal = useBugReportModal();
    const [reportType, setReportType] = useState('bug');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('low');
    const [steps, setSteps] = useState('');
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const { data: session } = useSession()
    const userId = session?.user?.id
    const { toggle } = useAuthModal();
    const router = useRouter();

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!description.trim()) newErrors.description = "Description is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!userId) {
            toggle();
            return;
        }
        setIsSubmitting(true);
        setSubmitSuccess(false);
        if (validateForm()) {
            try {
                const result = await submitBugReport({
                    title,
                    description,
                    reportType,
                    severity,
                    steps,
                }, userId);

                if (result.success) {
                    setSubmitSuccess(true);
                    toast({
                        title: "Success",
                        description: "Your report has been successfully submitted. Thank you for your feedback!",
                        duration: 5000,
                    });
                    setTimeout(() => {
                        bugReportModal.toggle();
                        resetForm();
                    }, 3000);
                } else {
                    if (Array.isArray(result.error)) {
                        // Handle Zod validation errors
                        const newErrors: {[key: string]: string} = {};
                        result.error.forEach(err => {
                            newErrors[err.path[0]] = err.message;
                        });
                        setErrors(newErrors);
                    } else {
                        // Handle other types of errors
                        setErrors({ form: result.error || "Failed to submit the report. Please try again." });
                    }
                    toast({
                        title: "Error",
                        description: "Failed to submit the report. Please check the form for errors and try again.",
                        duration: 5000,
                        variant: "destructive",
                    });
                }
            } catch (error) {
                console.error("Error in handleSubmit:", error);
                setErrors({ form: "An unexpected error occurred. Please try again." });
                toast({
                    title: "Error",
                    description: "An unexpected error occurred. Please try again.",
                    duration: 5000,
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                duration: 5000,
                variant: "destructive",
            });
        }
        setIsSubmitting(false);
    };

    const resetForm = () => {
        setReportType('bug');
        setTitle('');
        setDescription('');
        setSeverity('');
        setSteps('');
        setErrors({});
        setSubmitSuccess(false);
    };

    return (
        <Dialog open={bugReportModal.isOpen} onOpenChange={bugReportModal.toggle}>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center text-gray-800 max-h-[100vh] overflow-y-auto  p-4 border-gray-200">
                        Bug Report / Feature Request
                    </DialogTitle>
                    <DialogDescription className='border-b flex justify-center pb-2'>
                        <Badge onClick={()=>router.push(`/ui/66e08d3ddc002b277b1f3421`)} variant={"outline"} className="rounded-xl space-x-1 cursor-pointer">
                            <GitFork size={14} />
                            <p>From : 66e08d3ddc002b277b1f3421</p>
                        </Badge>
                    </DialogDescription>
                </DialogHeader>
                <div className="bg-gray-100 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-full max-w-2xl">
                        {submitSuccess ? (
                            <Alert className="mb-4">
                                <AlertDescription>
                                    Your report has been successfully submitted. Thank you for your feedback!
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="report-type" className="text-base font-bold text-gray-700">Report Type</Label>
                                    <RadioGroup defaultValue="bug" className='flex items-center space-x-4' onValueChange={setReportType}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="bug" id="bug" />
                                            <Label htmlFor="bug">Bug Report</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="feature" id="feature" />
                                            <Label htmlFor="feature">Feature Request</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-base font-bold text-gray-700">Title</Label>
                                    <Input
                                        id="title"
                                        className="w-full"
                                        placeholder="Enter a concise title for your report/request"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        maxLength={100}
                                    />
                                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-base font-bold text-gray-700">Description</Label>
                                    <Textarea
                                        id="description"
                                        className="w-full h-36"
                                        placeholder="Provide a detailed description of the bug or feature request"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        maxLength={1000}
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="severity" className="text-base font-bold text-gray-700">Severity/Priority</Label>
                                        <Select value={severity} onValueChange={setSeverity}>
                                            <SelectTrigger id="severity" className="w-full">
                                                <SelectValue placeholder="Select Severity/Priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                                <SelectItem value="critical">Critical</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="steps" className="text-base font-bold text-gray-700">Steps to Reproduce / Use Case</Label>
                                        <Textarea
                                            id="steps"
                                            className="w-full h-24"
                                            placeholder="Steps to Reproduce / Use Case"
                                            value={steps}
                                            onChange={(e) => setSteps(e.target.value)}
                                            maxLength={500}
                                        />
                                    </div>
                                </div>

                                {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Report"}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};