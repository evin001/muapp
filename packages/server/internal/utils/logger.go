package utils

import (
	"context"
	"os"

	"github.com/jackc/pgx/v4"
	log "github.com/sirupsen/logrus"
)

type Logger struct {
	l log.FieldLogger
}

func NewLogger() (*Logger, error) {
	file, err := os.OpenFile("pgx.log", os.O_WRONLY|os.O_CREATE, 0755)
	if err != nil {
		return nil, err
	}

	return &Logger{l: &log.Logger{
		Out:          file,
		Formatter:    new(log.TextFormatter),
		Hooks:        make(log.LevelHooks),
		Level:        log.DebugLevel,
		ExitFunc:     os.Exit,
		ReportCaller: false,
	}}, nil
}

func (l *Logger) Log(ctx context.Context, level pgx.LogLevel, msg string, data map[string]interface{}) {
	var logger log.FieldLogger
	if data != nil {
		logger = l.l.WithFields(data)
	} else {
		logger = l.l
	}

	switch level {
	case pgx.LogLevelTrace:
		logger.WithField("PGX_LOG_LEVEL", level).Debug(msg)
	case pgx.LogLevelDebug:
		logger.Debug(msg)
	case pgx.LogLevelInfo:
		logger.Info(msg)
	case pgx.LogLevelWarn:
		logger.Warn(msg)
	case pgx.LogLevelError:
		logger.Error(msg)
	default:
		logger.WithField("INVALID_PGX_LOG_LEVEL", level).Error(msg)
	}
}
