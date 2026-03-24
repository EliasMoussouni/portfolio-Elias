import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

export const Demo = () => (
  <Accordion className="w-full" type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Exemple</AccordionTrigger>
      <AccordionContent>Contenu de demonstration.</AccordionContent>
    </AccordionItem>
  </Accordion>
);
