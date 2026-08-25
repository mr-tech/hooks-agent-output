import { ClipboardDocumentIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { z } from 'zod';
import { generateErrorMessage } from 'zod-error';

import type { ContentLossChoice, ContentLossOption } from '~/utils';

import Button from '~/components/Button';
import LoadingDots from '~/components/LoadingDots';
import NullableComponent from '~/components/NullableComponent';
import { describeUnsupportedComponentTypes, discordMessageImportShape } from '~/server/api/utils/shapes';
import styles from '~/styles';
import {
  applyDisposition, describeDropSet, noticeMessageForSettled, resolveContentLoss,
} from '~/utils';
import useCodeMirror from '~/utils/hooks/useCodeMirror';
import useCopyToClipboard from '~/utils/hooks/useCopyToClipboard';

function isJSONParsable(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

type Props = {
  setMessage: (message: null | MessageData) => void;
};

const NewMessageJsonInput: FC<Props> = ({ setMessage }) => {
  const [jsonMessageString, setJsonMessageString] = useState(JSON.stringify({}, null, 2));
  const [copyState, copyToClipboard] = useCopyToClipboard();

  const [error, setError] = useState<null | string>(null);
  const [droppedComponentTypes, setDroppedComponentTypes] = useState<string[]>([]);
  const [pendingChoice, setPendingChoice] = useState<null | {
    validated: MessageData;
    disposition: ContentLossChoice;
  }>(null);
  const [dismissedChoice, setDismissedChoice] = useState<null | {
    validated: MessageData;
    disposition: ContentLossChoice;
  }>(null);
  const [settledNotice, setSettledNotice] = useState<null | string>(null);

  const commitChoice = (chosenOption: ContentLossOption) => {
    if (!pendingChoice) return;
    setMessage(applyDisposition(pendingChoice.validated, chosenOption.mode));
    setPendingChoice(null);
  };

  const cancelChoice = () => {
    if (pendingChoice) setDismissedChoice(pendingChoice);
    setPendingChoice(null);
    setMessage(null);
  };

  const reopenChoice = () => {
    if (!dismissedChoice) return;
    setPendingChoice(dismissedChoice);
    setDismissedChoice(null);
  };

  let copyButtonText;
  if (copyState === 'copying') {
    copyButtonText = (
      <>
        <LoadingDots />
        Copying...
      </>
    );
  } else if (copyState === 'copied') {
    copyButtonText = 'Copied!';
  } else {
    copyButtonText = (
      <>
        <ClipboardDocumentIcon className={styles.smallIcon} />
        Copy to Clipboard
      </>
    );
  }

  useUpdateEffect(() => {
    setDismissedChoice(null);
    setSettledNotice(null);
    try {
      const parsed = JSON.parse(jsonMessageString) as { components?: unknown };
      setDroppedComponentTypes(describeUnsupportedComponentTypes(parsed.components));
      const validated = discordMessageImportShape.parse(parsed) as MessageData;
      const disposition = resolveContentLoss(
        validated.flags as number | undefined,
        validated.components as undefined | { type: number }[],
        validated.content,
        validated.embeds,
      );
      setError(null);
      if (disposition.requiresChoice) {
        setPendingChoice({ validated, disposition });
        setMessage(null);
        return;
      }
      setPendingChoice(null);
      setSettledNotice(noticeMessageForSettled(disposition));
      setMessage(applyDisposition(validated));
    } catch (err) {
      setPendingChoice(null);
      if (err instanceof z.ZodError) {
        setError(generateErrorMessage(err.issues).split(' | ').join('\n'));
      } else {
        setDroppedComponentTypes([]);
        setError((err as Error).message.replace(/\n\n/g, '\n'));
      }
      setMessage(null);
    }
  }, [jsonMessageString]);

  const { ref, updateDoc } = useCodeMirror({
    value: jsonMessageString,
    onChange: setJsonMessageString,
  });

  if (pendingChoice) {
    return (
      <div className={styles.flex({ col: true, gap: 2 })}>
        <p className="mx-3 my-2 text-sm">
          This message has both Components V2 and classic content (text or embeds) — Discord
          cannot show both. Choose which to keep; nothing is created until you choose.
        </p>
        <div className={classNames(styles.flex({ col: true, gap: 2 }), 'mx-3')}>
          {pendingChoice.disposition.options.map((option) => (
            <Button
              key={option.mode}
              preset='tertiary'
              onPress={() => commitChoice(option)}
            >
              {option.mode === 'v2' ? 'Save as Components V2' : 'Save as Classic'}
              {' — '}
              {describeDropSet(option.dropSet)}
            </Button>
          ))}
        </div>
        <div className={classNames(styles.flex({ btw: true }), 'm-2')}>
          <Button preset='hyperlink' onPress={cancelChoice}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={ref} className='max-h-full w-full resize-none rounded bg-quaternary p-2 text-sm' />
      <NullableComponent show={error}>
        <p className="mx-3 my-2 whitespace-pre-line text-sm text-error">{error}</p>
      </NullableComponent>
      <NullableComponent show={droppedComponentTypes.length > 0}>
        <p className="mx-3 my-2 text-sm text-error">
          {`Not carried: ${droppedComponentTypes.join(', ')}. Discord does not support these on hooks.gg.`}
        </p>
      </NullableComponent>
      <NullableComponent show={settledNotice}>
        <p className="mx-3 my-2 text-sm text-warning">{settledNotice}</p>
      </NullableComponent>
      <NullableComponent show={!error && dismissedChoice}>
        <p className="mx-3 my-2 text-sm text-error">
          This message has both Components V2 and classic content — nothing was created. Choose
          which to keep, or edit the JSON.
          {' '}
          <Button
            className={styles.hyperlink}
            onPress={reopenChoice}
          >
            Resolve
          </Button>
        </p>
      </NullableComponent>
      <div className={classNames(styles.flex({ btw: true }), 'm-2')}>
        <Button
          preset='tertiary'
          onPress={() => copyToClipboard(jsonMessageString)}
          isDisabled={!!copyState}
        >
          {copyButtonText}
        </Button>
        <Button
          className={classNames(styles.hyperlink, 'py-2 px-4 text-sm')}
          onPress={() => updateDoc(JSON.stringify(JSON.parse(jsonMessageString), null, 2))}
          isDisabled={!isJSONParsable(jsonMessageString)}
        >
          Pretty print
        </Button>
      </div>
    </>
  );
};

export default NewMessageJsonInput;
