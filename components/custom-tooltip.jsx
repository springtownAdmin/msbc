"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export const CustomTooltip = ({ content='', children, position='default' }) => {

  let newStyle = {};

  if (position === 'default') {
    newStyle = { whiteSpace: 'nowrap' };
  } else if (position === 'right') {
    newStyle = { position: 'absolute', top: 1, left: 20, whiteSpace: 'nowrap' };
  } else if (position === 'left') {
    newStyle = { position: 'absolute', top: 1, right: 20, wordWrap: 'normal', whiteSpace: 'nowrap' };
  } else if (position === 'bottom') {
    newStyle = { position: 'absolute', bottom: '-80px', left: '-20px', whiteSpace: 'nowrap' };
  }


  return (
    <TooltipProvider>
        <Tooltip >
            <TooltipTrigger>{children}</TooltipTrigger>
            <TooltipContent style={newStyle}>
                <p>{content}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}
