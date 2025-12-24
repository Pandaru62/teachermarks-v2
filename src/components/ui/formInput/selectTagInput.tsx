import { Chip, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { testtag } from "../../../interfaces/test.interface";
import { getTextColor } from "../../../utils/getTextColor.function";

interface PropsInterface {
    label: string,
    tags: testtag[],
    value: number,
    name: string,
    onChange?: (e: React.ChangeEvent<any>) => void,
    error? : any,
    disabled? : boolean
}

export default function SelectTagInput(props: PropsInterface) {

    const {label, value, name, onChange, error, disabled = false, tags} = props;
    const selectedTag = tags.find(t => t.id === Number(value));
    const [open, setOpen] = useState(false);
    const [highlighted, setHighlighted] = useState<number>(-1);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);
    
    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (!listRef.current || !buttonRef.current) return;
            if (e.target instanceof Node && !listRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    useEffect(() => {
        if (open && highlighted >= 0) {
            const el = listRef.current?.querySelector('[data-highlighted]') as HTMLElement | null;
            if (el) el.scrollIntoView({ block: 'nearest' });
        }
    }, [open, highlighted]);

    const handleSelect = (selectedId: number) => {
        setOpen(false);
        // create a synthetic event similar to native select change
        const fakeEvent = { target: { name, value: selectedId } } as unknown as React.ChangeEvent<any>;
        onChange && onChange(fakeEvent);
        setHighlighted(-1);
        buttonRef.current?.focus();
    };

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="text-xl font-semibold text-black text-center mb-1">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    ref={buttonRef}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 border rounded-xl bg-white ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    onClick={() => { if (!disabled) setOpen(o => !o); }}
                    onKeyDown={(e) => {
                        if (disabled) return;
                        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setOpen(true);
                            setHighlighted(0);
                            setTimeout(() => listRef.current?.querySelector('[data-highlighted]')?.scrollIntoView({block: 'nearest'}), 0);
                        }
                        if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            setOpen(true);
                            setHighlighted(tags.length - 1);
                        }
                    }}
                >
                    <div className="flex items-center gap-3">
                        {selectedTag ? (
                            <Chip
                                value={selectedTag.name}
                                className="rounded-full"
                                style={{ backgroundColor: selectedTag.color ?? '#e5e7eb', color: getTextColor(selectedTag.color ?? '#ffffff') }}
                            />
                        ) : (
                            <span className="text-sm text-gray-500">Select a tag</span>
                        )}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                </button>

                {open && (
                    <ul
                        role="listbox"
                        ref={listRef}
                        tabIndex={-1}
                        className="absolute z-50 mt-1 w-full bg-white border rounded-lg max-h-60 overflow-auto shadow-lg"
                        onKeyDown={(e) => {
                            if (e.key === 'ArrowDown') {
                                e.preventDefault();
                                setHighlighted(h => Math.min(h + 1, tags.length - 1));
                                return;
                            }
                            if (e.key === 'ArrowUp') {
                                e.preventDefault();
                                setHighlighted(h => Math.max(h - 1, 0));
                                return;
                            }
                            if (e.key === 'Enter' && highlighted >= 0) {
                                e.preventDefault();
                                const tag = tags[highlighted];
                                handleSelect(tag.id);
                                return;
                            }
                            if (e.key === 'Escape') {
                                e.preventDefault();
                                setOpen(false);
                                buttonRef.current?.focus();
                                return;
                            }
                        }}
                    >
                        {tags.map((tag, idx) => {
                            const isHighlighted = idx === highlighted;
                            return (
                                <li
                                    key={tag.id}
                                    role="option"
                                    aria-selected={value === tag.id}
                                    data-highlighted={isHighlighted ? true : undefined}
                                    className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 ${isHighlighted ? 'bg-gray-100' : ''}`}
                                    onMouseEnter={() => setHighlighted(idx)}
                                    onMouseLeave={() => setHighlighted(-1)}
                                    onClick={() => handleSelect(tag.id)}
                                >
                                    <Chip
                                        value={tag.name}
                                        className="rounded-full"
                                        style={{ backgroundColor: tag.color ?? '#e5e7eb', color: getTextColor(tag.color ?? '#ffffff') }}
                                    />
                                    <span className="text-sm">{tag.name}</span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {error && (
                <Typography variant="small" color="pink" className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-6h2v2h-2zm0-10h2v8h-2z"/></svg> 
                    {error}
                </Typography>)
            }
        </div>
    );
}