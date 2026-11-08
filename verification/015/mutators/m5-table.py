import os
import sys

JSON_BODY = 'src/app/message/m/[id]/_components/JsonModalBody.tsx'
SAVE_AS = 'src/app/message/m/[id]/_components/SaveAsMenu.tsx'
PUSHER = 'src/providers/MessageProvider/usePusher.ts'
DROPDOWN = 'src/utils/hooks/useGuildDropdownItems.tsx'
DATE = 'src/utils/formatMessageDate.ts'
HEADER = 'src/app/message/_layout/Header.tsx'
FOLDER = 'src/app/message/f/[id]/page.tsx'
PREVIEW = 'src/app/preview/page.tsx'

FOLDER_CALL = "formatMessageDate(orderProp === 'createdAt' ? msg.createdAt : msg.updatedAt, 'Today at ')"
MUTANTS = {
    'm5a-allow-close-not-reset': (JSON_BODY, "    setAllowMenuClose(true);\n    onClose();", "    onClose();", 1),
    'm5b-copy-always-enabled': (JSON_BODY, "isDisabled={!!copyState || copyText === null}", "isDisabled={!!copyState}", 1),
    'm5b-copy-disabled-only-when-unparsable': (JSON_BODY, "isDisabled={!!copyState || copyText === null}", "isDisabled={!!copyState || !isJSONParsable(messageString)}", 1),
    'm5b-copy-copies-raw-draft': (JSON_BODY, "void copy(copyText);", "void copy(messageString);", 1),
    'm5c-pusher-reads-render-flag': (PUSHER, "${hasChangedRef.current ?", "${hasChanged ?", 1),
    'm5c-pusher-ref-never-updated': (PUSHER, "const hasChangedRef = useLatest(hasChanged);", "const hasChangedRef = { current: hasChanged };", 1),
    'm5d-dropdown-memo-once': (DROPDOWN, "  }, [session, setSelectedGuildId]);", "  }, []);", 1),
    'm5e-day-of-month-only': (DATE, "  return a.getFullYear() === b.getFullYear()\n    && a.getMonth() === b.getMonth()\n    && a.getDate() === b.getDate();", "  return a.getDate() === b.getDate();", 1),
    'm5e-month-dropped': (DATE, "    && a.getMonth() === b.getMonth()\n", "", 1),
    'm5e-year-dropped': (DATE, "  return a.getFullYear() === b.getFullYear()\n    && a.getMonth()", "  return a.getMonth()", 1),
    'm5e-prefix-ignored': (DATE, "return `${todayPrefix}${messageDate", "return `${messageDate", 1),
    'm5e-header-bypasses-formatter': (HEADER, "{formatMessageDate(msg.updatedAt)}", "{new Date(msg.updatedAt).toLocaleDateString()}", 2),
    'm5e-folder-bypasses-formatter': (FOLDER, FOLDER_CALL, "new Date(orderProp === 'createdAt' ? msg.createdAt : msg.updatedAt).toLocaleDateString()", 2),
    'm5e-folder-drops-prefix': (FOLDER, FOLDER_CALL, "formatMessageDate(orderProp === 'createdAt' ? msg.createdAt : msg.updatedAt)", 2),
    'm5f-save-as-name-not-refilled': (SAVE_AS, "    setMessageName(proposedName);\n", "", 1),
    'm5f-save-as-server-not-refilled': (SAVE_AS, "    setSelectedGuildId(message.guildId ?? '');\n  }, [isOpen]);", "  }, [isOpen]);", 1),
    'm5f-save-as-refills-only-at-mount': (SAVE_AS, "  }, [isOpen]);", "  }, []);", 1),
    'm5f-save-as-refills-on-close-too': (SAVE_AS, "    if (!isOpen) return;\n    setMessageName", "    setMessageName", 1),
    'm5g-delete-toast-says-refresh': (FOLDER, "Failed to delete message. Please try again.", "Failed to refresh message. Please try again.", 1),
    'm5h-array-passes': (PREVIEW, "typeof parsed !== 'object' || Array.isArray(parsed)", "typeof parsed !== 'object'", 1),
    'm5h-primitive-passes': (PREVIEW, "typeof parsed !== 'object' || Array.isArray(parsed)", "Array.isArray(parsed)", 1),
    'm5h-parse-error-uncaught': (PREVIEW, "  } catch {\n    return null;\n  }", "  } finally {\n    // none\n  }", 1),
    'm5h-error-text-changed': (PREVIEW, "Invalid message data.", "Bad data.", 1),
    'm5h-error-not-text-error': (PREVIEW, "className=\"text-sm text-error\"", "className=\"text-sm\"", 1),
}

mid = os.environ['MUT_ID']
path, old, new, count = MUTANTS[mid]
src = open(path).read()
if src.count(old) != count:
    print('MUTATOR FAILED: %s matched %d times, expected %d' % (mid, src.count(old), count))
    sys.exit(1)
open(path, 'w').write(src.replace(old, new))
print('mutated', mid)
