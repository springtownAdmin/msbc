"use client";

import { useToast } from "@/components/ui/use-toast";

const useCustomToast = () => {

    const { toast } = useToast();

    const showToast = (code = 200, message = '') => {

        if (message !== '') {

            if (code >= 200 && code < 300) {
                toast({ title: message, className: 'bg-green-100 border-green-300 text-green-600' });
                return;
            }

            if (code >= 300 && code <= 500) {
                toast({ title: message, variant: 'destructive' });
                return;
            }

        }

        return;

    }

    return { showToast };

}

export default useCustomToast