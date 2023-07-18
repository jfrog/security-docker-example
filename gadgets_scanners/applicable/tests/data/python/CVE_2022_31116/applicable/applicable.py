from ujson import loads


def load_data(args, filename, skip_no_answer=False):
    # Load JSON lines
    with open(filename) as f:
        examples = [loads(line) for line in f]

    # Make case insensitive?
    if args.uncased_question or args.uncased_doc:
        for ex in examples:
            if args.uncased_question:
                ex['question'] = [w.lower() for w in ex['question']]
                ex['question_char'] = [w.lower() for w in ex['question_char']]
            if args.uncased_doc:
                ex['document'] = [w.lower() for w in ex['document']]
                ex['document_char'] = [w.lower() for w in ex['document_char']]

    if skip_no_answer:
        examples = [ex for ex in examples if len(ex['answers']) > 0]
    return examples
